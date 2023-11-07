// statements for testing

// Partial schema for Lobsters in the K9db paper
export const lobstersStatements = `
    CREATE DATA_SUBJECT TABLE users (
        id INT PRIMARY KEY
    );
    CREATE TABLE stories (
        id INT PRIMARY KEY,
        title TEXT,
        author INT NOT NULL OWNED_BY users(id) 
    );
    CREATE TABLE tags (
        id INT PRIMARY KEY,
        tag TEXT
    );
    CREATE TABLE taggings (
        id INT PRIMARY KEY,
        story_id INT NOT NULL OWNED_BY stories(id), 
        tag_id INT NOT NULL ACCESSES tags(id)
    );
    CREATE TABLE messages (
        id INT PRIMARY KEY, 
        body text, 
        sender INT NOT NULL OWNED_BY users(id), 
        receiver INT NOT NULL OWNED_BY users(id), 
        ON DEL sender ANON (sender),
        ON DEL receiver ANON (receiver)
    );
`


// Partial schema for ownCloud file sharing in the K9db paper
export const ownCloudStatements = `
    CREATE DATA_SUBJECT TABLE user (
        id INT PRIMARY KEY,
        ...
    );
    CREATE TABLE group (
        id INT PRIMARY KEY,
        title TEXT,
        ...
    );
    CREATE TABLE member (
        id INT PRIMARY KEY,
        uid INT NOT NULL OWNED_BY user(id),
        gid INT NOT NULL OWNS group(id)
    );
    CREATE TABLE share (
        id INT PRIMARY KEY,
        uid_owner INT NOT NULL OWNED_BY user(id),
        share_with INT ACCESSED_BY user(id),
        share_with_group INT ACCESSED_BY group(id)
    );
`