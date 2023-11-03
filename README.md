## Live Demo

Click [here](https://mingchao-zhang.github.io/K9db-Visualizer/)

## How to Build Locally

```console
cd k9db-visualizer
npm install
npm run dev
```

For the current phase, you should able to see this page:

![Alt text](./readme_imgs/simple_dynamic.png)

## Canvas TODO

- [x] Decompose flow into node and edges
- [x] Add static support for K9DB edges and nodes
- [x] Flow should dynamically render the nodes and edges according to the parser result (use fake data at the test stage)
- [ ] Dynamically generate source and target anchors for each node
- [ ] Dynamically position the nodes and edges to prevent intersection/overlaps...
- [x] Schema button should have a pop-up window as a text box
- [x] Schema button should be able to send the input to the parser
- [ ] Validate button should have a pop-up window to display alert message
- [ ] Validate button should be able to send the existing graph data as arguments to `validate` function to valid the existing graph.
