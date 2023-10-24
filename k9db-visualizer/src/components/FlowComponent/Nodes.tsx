const Nodes = () => {
  return [
    {
      id: "1",
      type: "datasubjectnode",
      data: { label: "user", handleCount: 2 },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: "nondatasubjectnode",
      data: { label: "STORYssdsadasdsasss", handleCount: 2 },
      position: { x: 150, y: 100 },
    },
    {
      id: "3",
      type: "nondatasubjectnode",
      data: { label: "TAGGING", handleCount: 2 },
      position: { x: 0, y: 180 },
    },
    {
      id: "4",
      type: "nondatasubjectnode",
      data: { label: "TAG", handleCount: 2 },
      position: { x: 250, y: 200 },
    },
    {
      id: "5",
      type: "nondatasubjectnode",
      data: { label: "TEST", handleCount: 2 },
      position: { x: 400, y: 300 },
    },
  ];
};

export default Nodes;
