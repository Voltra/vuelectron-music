const defaults = {
    string: "N/A",
    number: 0,
    object: {},
    date: "dd/mm/yyyy",
    year: 0
};

const msg = {
    NO_DB: "No database connection set up",
    NO_DATA: "No data for this table",
    ALREADY_EXISTS: "There's already a row with this unique column value",
    NOT_FOUND_OR_DUPLICATE: "The requested data either has a duplicate or doesn't exist",
    CANNOT_REMOVE_NOT_INSERTED: "Cannot remove a tuple that has not been inserted"
};

const events = {
    UPDATE: "update",
    INSERT: "insert",
    REMOVE: "remove"
};

export { defaults, msg, events }