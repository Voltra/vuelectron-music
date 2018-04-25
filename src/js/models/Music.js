class Music{
    static defaults = {
        string: "N/A",
        number: 0,
        object: {},
        date: "00/00/0000",
        year: 0
    };

    static msg = {
        NO_DB: "No database connection set up",
        NO_DATA: "No data for this table",
        ALREADY_EXISTS: "There's already a row with this unique column value",
        NOT_FOUND_OR_DUPLICATE: "The requested data either has a duplicate or doesn't exist",
        CANNOT_REMOVE_NOT_INSERTED: "Cannot remove a tuple that has not been inserted"
    };

    static $db = null;
    static tmp_id = "mid";
    static id = "id";
    static unique = "path";
    static table = "musics";

    static setDb(db){
        this.$db = db;
    }

    static hasDb(){
        return this.$db != null;
    }

    static hasData(){
        if(!this.hasDb())
            return Promise.reject(Music.msg.NO_DB);

        return this.$db[this.table]
        .count()
        .then(count => {
            if(count < 1)
                return Promise.reject(this.msg.NO_DATA);

            return Promise.resolve(results);
        });
    }

    static all(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.$db[this.table]
        .query()
        .all()
        .execute();

    }

    static doesNotExist(path){
        if(!Music.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.$db[this.table].query()
        .filter(this.unique, path)
        .execute()
        .then(results => {
            if(results.length >= 1)
                return Promise.reject(this.msg.ALREADY_EXISTS);

            return Promise.resolve([]);
        });
    }

    static fromDB(id, isPath = false){
        if(!Music.hasDb())
            return Promise.reject(this.msg.NO_DB);

        const fromDbResult = result => {
            const {path} = result;
            const meta = {
                common: {
                    title: result.title,
                    artist: result.artist,
                    album: result.album,
                    year: result.year,
                    genre: [result.genre]
                },
                format: {
                    duration: result.duration
                }
            };
            const neo = new Music(path, meta);
            neo.date_added = result.date_added;
            neo.plays = result.plays;
            neo.__inserted = true;
            neo[Music.tmp_id] = result[Music.id];
            return neo;
        };

        if(isPath)
            return this.$db[this.table].query()
            .filter(this.unique, id)
            .execute()
            .then(results => {
                if(results.length === 1)
                    return Promise.resolve(
                        fromDbResult(results[0])
                    );

                return Promise.reject(this.msg.NOT_FOUND_OR_DUPLICATE);
            });
        else
            return this.$db[this.table]
            .get(id)
            .then(result => {
                if(!result || !result[this.constructor.id])
                    return Promise.reject(this.msg.NOT_FOUND_OR_DUPLICATE);

                return Promise.resolve(result);
            });
    }

    static from(path, meta){
        return this.doesNotExist(path)
        .then(_ => new Music(path, meta));
    }

    static removeFromId(id){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.$db[this.table].remove(id);

    }

    static purge(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        this.$db[this.table].query()
        .all()
        .execute()
        .then(results => results.map(result => result.id))
        .then(ids => Promise.all(
            ids.map(id => this.removeFromId(id))
        ));
    }

    constructor(path, meta){ //Do not use directly
        const common = meta.common || Music.defaults.object;
        const format = meta.format || Music.defaults.object;

        this.path = path;
        this.title = common.title || Music.defaults.string;
        this.duration = format.duration || Music.defaults.number;
        this.artist = common.artist || Music.defaults.string;

        if(common.artists)
            this.artist = this.artist || common.artists[0] || Music.defaults.string;

        this.album = common.album || Music.defaults.string;
        this.year = common.year || Music.defaults.year;
        this.genre = (common.genre && common.genre[0]) ? common.genre[0] : Music.defaults.string;

        this.date_added = Date.now();
        this.plays = Music.defaults.number;

        this.__inserted = false;
        this[Music.tmp_id] = null;
    }

    getData(){
        const {
            path,
            title,
            duration,
            artist,
            album,
            genre,
            date_added,
            plays
        } = this;

        return {
            path,
            title,
            duration,
            artist,
            album,
            genre,
            date_added,
            plays
        };
    }

    insert(){
        if(this.__inserted)
            return this.update();

        if(!Music.hasDb())
            return Promise.reject(Music.msg.NO_DB);

        return Music.$db[Music.table].add(this.getData())
        .then(item => {
            this[Music.tmp_id] = item[Music.id];
            this.__inserted = true;
            return item;
        });
    }

    update(){
        if(!this.__inserted)
            return this.insert();

        if(!Music.hasDb())
            return Promise.reject(Music.msg.NO_DB);

        return Music.$db.update(this.getData());
    }

    remove(){
        if(!this.__inserted || this[Music.tmp_id] == null)
            return Promise.reject(Music.msg.CANNOT_REMOVE_NOT_INSERTED);

        if(!Music.hasDb())
            return Promise.reject(Music.msg.NO_DB);

        return Music.$db.remove(this[Music.tmp_id])
        .then(_ => {
            this[Music.tmp_id] = null;
            this.__inserted = false;
        });
    }
}

export {Music}