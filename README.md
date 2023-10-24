# README
Let's go!

Michael's comment

nora's comment

nora's second comment

## How to Build

```console
cd k9db-visualizer 
npm install
npm run dev
```

For the current phase, you should able to see this page:

<img width="1512" alt="image" src="https://github.com/mingchao-zhang/K9db-Visualizer/assets/57975957/e321a3fa-d5d0-463c-94aa-52097963009e">

## Canvas TODO

* [x] Decompose flow into node and edges
* [x] Add static support for K9DB edges and nodes
* [ ] Flow should dynamically render the nodes and edges according to the parser result (use fake data at the test stage)
  * [ ] Dynamically generate source and target anchors for each node
  * [ ] Dynamically position the nodes to prevent intersection/overlaps... 
* [ ] Schema button should have a pop-up window as a text box
* [ ] Schema button should be able to send the input to the parser
* [ ] Validate button should have a pop-up window to display alert message
* [ ] Validate button should be able to send the existing graph data as arguments to `validate` function to valid the existing graph. 
