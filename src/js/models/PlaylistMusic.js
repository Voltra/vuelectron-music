import { defaults, msg, events } from "@js/models/ErrorHandling"

const PlaylistMusicEvents = Object.assign({}, events);

class PlaylistMusic{
    static table = "playlistMusics";
    static defaults = defaults;
    static msg = msg;
    
    static listeners = Object.values(PlaylistMusicEvents)
    .map(event => ({[event]: []}))
    .reduce(Object.assign, {});

    //static unique = "name";
    static tmp_id = "pmid";
    static id = "id";
    static $db = null;

    static eventIsRegistered(event){
        return this.listeners[event];
    }

    static on(event, listener){
        if(!this.eventIsRegistered(event))
            this.listeners[event] = [];

        this.listeners[event].push(listener);
    }

    static off(event, listener){
        if(listener === undefined){
            if(!this.eventIsRegistered(event))
                return;

            this.listeners[event] = [];
            return;
        }

        if(!this.eventIsRegistered(event))
            return;

        if(!this.listeners[event].includes(listener))
            return;

        const index = this.listeners[event].indexOf(listener);
        this.listeners.splice(index, 1);
    }

    static trigger(event, ...args){
        if(!this.eventIsRegistered(event))
            return;

        this.listeners[event].forEach(listener => listener(...args));
    }


    static hasDb(){ return this.$db !== null; }
    static setDb(db){ this.$db = db; }
    static getTable(){ return this.$db[this.table]; }

    static hasData(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable()
        .count()
        .then(count => {
            if(count < 1)
                return Promise.reject(this.msg.NO_DATA);

            return Promise.resolve(count);
        });
    }

    static all(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable()
        .query()
        .all()
        .execute();
    }

    static doesNotExist(pmid){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable().query()
        .filter(this.id, pmid) //TODO: Test this
        .execute()
        .then(results => {
            if(results.length >= 1)
                return Promise.reject(this.msg.ALREADY_EXISTS);

            return Promise.resolve([]);
        });
    }

    static fromDB(id){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        const fromDbResult = result => {
            const { pid, mid, date_added } = result;
            const meta = {
                date_added,
                pid,
                mid,
            };

            const neo = new PlaylistMusic(meta);
            neo.date_added = date_added;
            neo.__inserted = true;
            neo[this.tmp_id] = result[this.id];
            return neo;
        };

        
        return this.getTable()
        .get(id)
        .then(result => {
            if(!result || !result[this.id])
                return Promise.reject(this.msg.NOT_FOUND_OR_DUPLICATE);

            return Promise.resolve(fromDbResult(result));
        });
    }

    static from(meta){
        return this.doesNotExist()
        .then(_ => new PlaylistMusic(meta));
    }

    static removeFromId(id, shouldTriggerEvents=true){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable().remove(id)
        .then((...args) => {
            if(shouldTriggerEvents)
                this.trigger(PlaylistMusicEvents.REMOVE);

            return Promise.resolve(...args);
        });

    }

    static purge(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable()
        .clear().then(_ => this.trigger(PlaylistMusicEvents.REMOVE))
    }


    constructor(meta){
        const { pid, mid } = meta;
        this.pid = pid;
        this.mid = mid;
        this.date_added = new Date();

        this.__inserted = false;
        this[PlaylistMusic.tmp_id] = null;
    }

    getData(){
        const {
            pid,
            mid,
            date_added,
        } = this;

        return {
            pid,
            mid,
            date_added,
        };
    }

    insert(){
        if(this.__inserted)
            return this.update();

        if(!PlaylistMusic.hasDb())
            return Promise.reject(PlaylistMusic.msg.NO_DB);

        return PlaylistMusic.$db[PlaylistMusic.table].add(this.getData())
        .then(item => {
            this[PlaylistMusic.tmp_id] = item[PlaylistMusic.id];
            this.__inserted = true;
            PlaylistMusic.trigger(PlaylistMusicEvents.INSERT);

            //return item;
            return this;
        });
    }

    update(){
        if(!this.__inserted)
            return this.insert();

        if(!PlaylistMusic.hasDb())
            return Promise.reject(PlaylistMusic.msg.NO_DB);

        return PlaylistMusic.$db.update(this.getData())
        .then((...args)=>{
            PlaylistMusic.trigger(PlaylistMusicEvents.UPDATE);
            return Promise.resolve(...args);
        });
    }

    remove(){
        if(!this.__inserted || this[PlaylistMusic.tmp_id] == null)
            return Promise.reject(PlaylistMusic.msg.CANNOT_REMOVE_NOT_INSERTED);

        if(!PlaylistMusic.hasDb())
            return Promise.reject(PlaylistMusic.msg.NO_DB);

        return PlaylistMusic.$db.remove(this[PlaylistMusic.tmp_id])
        .then(_ => {
            this[PlaylistMusic.tmp_id] = null;
            this.__inserted = false;
            PlaylistMusic.trigger(PlaylistMusicEvents.REMOVE);
        });
    }
}

export {PlaylistMusicEvents, PlaylistMusic}