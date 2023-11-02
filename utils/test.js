import parse from './parse.js';
import { getGraph, topoSort } from './graph.js';
import { calculateCoordinates } from './coordinate.js'

const createStatements =
    `CREATE DATA_SUBJECT TABLE users (
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
    );`

const testCase2 = `
CREATE DATA_SUBJECT TABLE user (id INT PRIMARY KEY, ...);
CREATE TABLE group (id INT PRIMARY KEY, title TEXT, ...);
CREATE TABLE member (
    id INT PRIMARY KEY, uid INT NOT NULL OWNED_BY user(id), gid INT NOT NULL OWNS group(id)
    );
    CREATE TABLE share (
        id INT PRIMARY KEY,
uid_owner INT NOT NULL OWNED_BY user(id), share_with INT ACCESSED_BY user(id), share_with_group INT ACCESSED_BY group(id));
`
// get graph and topologically-sorted nodes
var parsedObjects = parse(createStatements)
console.log(parsedObjects)
var graph = getGraph(parsedObjects)
var sortedNodes = topoSort(graph)
console.log(graph)
console.log(sortedNodes)

// calculate coordinates
var canvasWidth = 1000
var canvasHeight = 1000
var coords = calculateCoordinates(sortedNodes, graph, canvasWidth, canvasHeight)
console.log(coords)
