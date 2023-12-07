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

export const flowAgainstDataSubject1 = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a_a INT NOT NULL OWNED_BY B(id)
    );
    CREATE TABLE B (
        id INT PRIMARY KEY,

    );
`

// A <-> B
export const twoNodesCycle1 = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a1 INT NOT NULL OWNED_BY B(id)
    );
    CREATE TABLE B (
        id INT PRIMARY KEY,
        b1 INT NOT NULL OWNED_BY A(id)
    );
`

// C -> A <-> B
export const twoNodesCycle2 = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a1 INT NOT NULL OWNED_BY B(id)
    );
    CREATE TABLE B (
        id INT PRIMARY KEY,
        b1 INT NOT NULL OWNED_BY A(id)
    );
    CREATE TABLE C (
        id INT PRIMARY KEY,
        c1 INT NOT NULL OWNED_BY A(id)
    );
`

// D -> A 
//      ↑  ↘
//      C ← B
export const threeNodesCycle = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a1 INT NOT NULL OWNED_BY B(id)
    );
    CREATE TABLE B (
        id INT PRIMARY KEY,
        b1 INT NOT NULL OWNED_BY C(id)
    );
    CREATE TABLE C (
        id INT PRIMARY KEY,
        c1 INT NOT NULL OWNED_BY A(id)
    );
    CREATE TABLE D (
        id INT PRIMARY KEY,
        d1 INT NOT NULL OWNED_BY A(id)
    );
`

// A (DataSubject) -> B (DataSubject)
export const multipleDataSubjects1 = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a1 INT NOT NULL OWNED_BY B(id)
    );
    CREATE DATA_SUBJECT TABLE B (
        id INT PRIMARY KEY,
        b1 INT NOT NULL
    );
`

// A (DataSubject) -> B (DataSubject) -> C
export const multipleDataSubjects2 = `
    CREATE DATA_SUBJECT TABLE A (
        id INT PRIMARY KEY,
        a1 INT NOT NULL OWNED_BY B(id)
    );
    CREATE DATA_SUBJECT TABLE B (
        id INT PRIMARY KEY,
        b1 INT NOT NULL OWNED_BY C(id)
    );
    CREATE TABLE C (
        id INT PRIMARY KEY,
        c1 INT NOT NULL
    );
`

export const lobsterCompleteSchema = `
CREATE DATA_SUBJECT TABLE users (
    id int NOT NULL PRIMARY KEY,
    username varchar(50) UNIQUE,
    email varchar(100),
    password_digest varchar(75),
    created_at datetime,
    is_admin int,
    password_reset_token varchar(75),
    session_token varchar(75) NOT NULL,
    about text,
    invited_by_user_id int,
    is_moderator int,
    pushover_mentions int,
    rss_token varchar(75),
    mailing_list_token varchar(75),
    mailing_list_mode int,
    karma int NOT NULL,
    banned_at datetime,
    banned_by_user_id int,
    banned_reason varchar(200),
    deleted_at datetime,
    disabled_invite_at datetime,
    disabled_invite_by_user_id int,
    disabled_invite_reason varchar(200),
    settings text
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX users_username ON users (username);
  
  
  CREATE TABLE stories (
    id int NOT NULL PRIMARY KEY,
    created_at datetime,
    user_id int,
    url varchar(250),
    title varchar(150) NOT NULL,
    description text,
    short_id varchar(6) NOT NULL UNIQUE,
    is_expired int NOT NULL,
    upvotes int NOT NULL,
    downvotes int NOT NULL,
    is_moderated int NOT NULL,
    hotness int NOT NULL,
    markeddown_description text,
    story_cache text,
    comments_count int NOT NULL,
    merged_story_id int,
    unavailable_at datetime,
    twitter_id varchar(20),
    user_is_author int,
    FOREIGN KEY (user_id) REFERENCES users(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX stories_short_id ON stories (short_id);
  CREATE INDEX stories_user_id ON stories (user_id);
  CREATE INDEX stories_merged_story ON stories (merged_story_id);
  
  
  CREATE TABLE comments (
    id int NOT NULL PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime,
    short_id varchar(10) NOT NULL UNIQUE,
    story_id int NOT NULL,
    user_id int NOT NULL,
    parent_comment_id int,
    thread_id int,
    comment text NOT NULL,
    upvotes int NOT NULL,
    downvotes int NOT NULL,
    confidence int NOT NULL,
    markeddown_comment text,
    is_deleted int,
    is_moderated int,
    is_from_email int,
    hat_id int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX comments_short_id ON comments (short_id);
  CREATE INDEX comments_user_id ON comments (user_id);
  CREATE INDEX comments_story_id ON comments (story_id);
  
  
  CREATE TABLE hat_requests (
    id int NOT NULL PRIMARY KEY,
    created_at datetime,
    updated_at datetime,
    user_id int,
    hat varchar(255),
    link varchar(255),
    comment text,
    FOREIGN KEY (user_id) REFERENCES users(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX hat_requests_user_id ON hat_requests (user_id);
  
  
  CREATE TABLE hats (
    id int NOT NULL PRIMARY KEY,
    created_at datetime,
    updated_at datetime,
    user_id int,
    granted_by_user_id int,
    hat varchar(255) NOT NULL,
    link varchar(255),
    modlog_use int,
    doffed_at datetime,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (granted_by_user_id) OWNED_BY users(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX hats_user_id ON hats (user_id);
  CREATE INDEX hats_granted_by_user_id ON hats (granted_by_user_id);
  
  
  CREATE TABLE hidden_stories (
    id int NOT NULL PRIMARY KEY,
    user_id int,
    story_id int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX hidden_stories_user_story ON hidden_stories (user_id, story_id);
  CREATE INDEX hidden_stories_user_id ON hidden_stories (user_id);
  CREATE INDEX hidden_stories_story_id ON hidden_stories (story_id);
  
  
  CREATE DATA_SUBJECT TABLE invitation_requests (
    id int NOT NULL PRIMARY KEY,
    code varchar(255),
    is_verified int,
    email varchar(255),
    name varchar(255),
    memo text,
    ip_address varchar(255),
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  
  
  CREATE DATA_SUBJECT TABLE invitations (
    id int NOT NULL PRIMARY KEY,
    user_id int,
    email varchar(255),
    code varchar(255),
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    memo text,
    FOREIGN KEY (user_id) OWNED_BY users(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX invitations_user_id ON invitations (user_id);
  
  
  CREATE TABLE keystores (
    keyX varchar(50) NOT NULL PRIMARY KEY,
    valueX int
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  
  
  CREATE TABLE messages (
    id int NOT NULL PRIMARY KEY,
    created_at datetime,
    author_user_id int,
    recipient_user_id int,
    has_been_read int,
    subject varchar(100),
    body text,
    short_id varchar(30),
    deleted_by_author int,
    deleted_by_recipient int,
    FOREIGN KEY (author_user_id) OWNED_BY users(id),
    FOREIGN KEY (recipient_user_id) OWNED_BY users(id),
    ON DEL author_user_id ANON (author_user_id),
    ON DEL recipient_user_id ANON (recipient_user_id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX messages_short_id ON messages (short_id);
  CREATE INDEX messages_author ON messages (author_user_id);
  CREATE INDEX messages_recipient ON messages (recipient_user_id);
  
  
  CREATE TABLE moderations (
    id int NOT NULL PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    moderator_user_id int,
    story_id int,
    comment_id int,
    user_id int,
    \`action\` text,
    reason text,
    is_from_suggestions int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (moderator_user_id) OWNED_BY users(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX moderations_user_id ON moderations (user_id);
  CREATE INDEX moderations_mod_user_id ON moderations (moderator_user_id);
  
  
  CREATE TABLE read_ribbons (
    id int NOT NULL PRIMARY KEY,
    is_following int,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    user_id int,
    story_id int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8mb4;
  CREATE INDEX read_ribbons_user_id ON read_ribbons (user_id);
  CREATE INDEX read_ribbons_story_id ON read_ribbons (story_id);
  CREATE INDEX read_ribbons_composite ON read_ribbons(user_id, story_id);
  
  
  CREATE TABLE saved_stories (
    id int NOT NULL PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    user_id int,
    story_id int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX saved_stories_user_id ON saved_stories (user_id);
  CREATE INDEX saved_stories_story_id ON saved_stories (story_id);
  CREATE INDEX saved_stories_composite ON saved_stories(user_id, story_id);
  
  
  CREATE TABLE tags (
    id int NOT NULL PRIMARY KEY,
    tag varchar(25) NOT NULL UNIQUE,
    description varchar(100),
    privileged int,
    is_media int,
    inactive int,
    hotness_mod int
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX tags_tag ON tags (tag);
  
  
  CREATE TABLE suggested_taggings (
    id int NOT NULL PRIMARY KEY,
    story_id int,
    tag_id int,
    user_id int,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES users(id),
    FOREIGN KEY (tag_id) ACCESSES tags(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX suggested_taggings_user_id ON suggested_taggings (user_id);
  CREATE INDEX suggested_taggings_story_id ON suggested_taggings (story_id);
  
  
  CREATE TABLE suggested_titles (
    id int NOT NULL PRIMARY KEY,
    story_id int,
    user_id int,
    title varchar(150) NOT NULL,
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX suggested_titles_user_id ON suggested_titles (user_id);
  CREATE INDEX suggested_titles_story_id ON suggested_titles (story_id);
  
  
  CREATE TABLE tag_filters (
    id int NOT NULL PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    user_id int,
    tag_id int,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX tag_filters_user_id ON tag_filters (user_id);
  
  
  CREATE TABLE taggings (
    id int NOT NULL PRIMARY KEY,
    story_id int NOT NULL,
    tag_id int NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX taggings_story_id ON taggings (story_id);
  CREATE INDEX taggings_composite ON taggings (story_id, tag_id);
  
  
  CREATE TABLE votes (
    id int NOT NULL PRIMARY KEY,
    user_id int NOT NULL,
    story_id int NOT NULL,
    comment_id int,
    vote int NOT NULL,
    reason varchar(1),
    FOREIGN KEY (user_id) OWNED_BY users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
  ) ENGINE=ROCKSDB DEFAULT CHARSET=utf8;
  CREATE INDEX votes_user_id ON votes (user_id);
  CREATE INDEX votes_story_id ON votes (story_id);
  CREATE INDEX votes_comment_id ON votes (comment_id);
  CREATE INDEX votes_composite ON votes(user_id, comment_id, story_id);
  
  
  INSERT INTO tags VALUES (1, 'test', NULL, 0, 0, 0, 0);
`