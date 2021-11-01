import { defaults, msg, events } from "@js/models/ErrorHandling"

const PlaylistEvents = Object.assign({}, events);

class Playlist{
    static table = "playlists";
    static defaults = defaults;
    static msg = msg;
    
    static listeners = Object.values(PlaylistEvents)
    .map(event => ({[event]: []}))
    .reduce(Object.assign, {});

    static unique = "name";
    static tmp_id = "pid";
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

    static doesNotExist(name){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable().query()
        .filter(this.unique, name)
        .execute()
        .then(results => {
            if(results.length >= 1)
                return Promise.reject(this.msg.ALREADY_EXISTS);

            return Promise.resolve([]);
        });
    }

    static fromDB(id, isName=false){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        const fromDbResult = result => {
            const { name, date_created } = result;
            const meta = {
                date_created
            };

            const neo = new Playlist(name, meta);
            neo.date_created = date_created;
            neo.__inserted = true;
            neo[this.tmp_id] = result[this.id];
            return neo;
        };

        if(isName)
            return this.getTable().query()
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
            return this.getTable()
            .get(id)
            .then(result => {
                if(!result || !result[this.id])
                    return Promise.reject(this.msg.NOT_FOUND_OR_DUPLICATE);

                return Promise.resolve(fromDbResult(result));
            });
    }

    static from(name, meta={}){
        return this.doesNotExist()
        .then(_ => new Playlist(name, meta));
    }

    static removeFromId(id, shouldTriggerEvents=true){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable().remove(id)
        .then((...args) => {
            if(shouldTriggerEvents)
                this.trigger(PlaylistEvents.REMOVE);

            return Promise.resolve(...args);
        });

    }

    static purge(){
        if(!this.hasDb())
            return Promise.reject(this.msg.NO_DB);

        return this.getTable()
        .clear().then(_ => this.trigger(PlaylistEvents.REMOVE))
    }


    constructor(name, meta){
        this.name = name;
        this.date_created = new Date();

        this.__inserted = false;
        this[Playlist.tmp_id] = null;
    }

    getData(){
        const {
            name,
            date_created,
        } = this;

        return {
            name,
            date_created,
        };
    }

    insert(){
        if(this.__inserted)
            return this.update();

        if(!Playlist.hasDb())
            return Promise.reject(Playlist.msg.NO_DB);

        return Playlist.$db[Playlist.table].add(this.getData())
        .then(item => {
            this[Playlist.tmp_id] = item[Playlist.id];
            this.__inserted = true;
            Playlist.trigger(PlaylistEvents.INSERT);

            //return item;
            return this;
        });
    }

    update(){
        if(!this.__inserted)
            return this.insert();

        if(!Playlist.hasDb())
            return Promise.reject(Playlist.msg.NO_DB);

        return Playlist.$db.update(this.getData())
        .then((...args)=>{
            Playlist.trigger(PlaylistEvents.UPDATE);
            return Promise.resolve(...args);
        });
    }

    remove(){
        if(!this.__inserted || this[Playlist.tmp_id] == null)
            return Promise.reject(Playlist.msg.CANNOT_REMOVE_NOT_INSERTED);

        if(!Playlist.hasDb())
            return Promise.reject(Playlist.msg.NO_DB);

        return Playlist.$db.remove(this[Playlist.tmp_id])
        .then(_ => {
            this[Playlist.tmp_id] = null;
            this.__inserted = false;
            Playlist.trigger(PlaylistEvents.REMOVE);
        });
    }
}

export {PlaylistEvents, Playlist}