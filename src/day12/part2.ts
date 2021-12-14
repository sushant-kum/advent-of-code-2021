import fs from 'fs';

type NodeType = 'start' | 'upper-case' | 'lower-case' | 'end';

interface Graph {
  nodeNames: string[];
  adjMap: { [key: string]: string[] };
}

enum NodeName {
  START = 'start',
  END = 'end',
}

const input = JSON.parse(fs.readFileSync('./src/day12/data/input.json', 'utf8'));
const rawPaths: string[] = input.paths;
const graph: Graph = {
  nodeNames: [],
  adjMap: {},
};

let pathCount = 0;

function getNodeTypeFromName(nodeName: string): NodeType {
  switch (nodeName) {
    case NodeName.START:
      return 'start';

    case NodeName.END:
      return 'end';

    default:
      if (nodeName === nodeName.toUpperCase()) {
        return 'upper-case';
      }
      return 'lower-case';
  }
}

function initAdjMapNode(nodeName: string): void {
  graph.adjMap[nodeName] = [];
}

function addAdjNode(nodeName: string, possibleAdjNodeName: string): void {
  if (graph.adjMap[nodeName].includes(possibleAdjNodeName)) {
    return;
  }

  graph.adjMap[nodeName] = [...graph.adjMap[nodeName], possibleAdjNodeName];
}

function addAdjNodes(node1Name: string, node2Name: string): void {
  if (node1Name !== NodeName.END && node2Name !== NodeName.START) {
    addAdjNode(node1Name, node2Name);
  }

  if (node1Name !== NodeName.START && node2Name !== NodeName.END) {
    addAdjNode(node2Name, node1Name);
  }
}

function isProceedableNode(nodeName: string, adjNodeIndex: number, localPathList: string[]): boolean {
  const adjNodeName: string = graph.adjMap[nodeName][adjNodeIndex];

  if (getNodeTypeFromName(adjNodeName) !== 'lower-case') {
    return true;
  }

  if (localPathList.filter((pathNode) => pathNode === adjNodeName).length < 1) {
    return true;
  }

  if (localPathList.filter((pathNode) => pathNode === adjNodeName).length === 1) {
    for (
      let i = 0;
      i < graph.nodeNames.filter((node) => ['lower-case', 'end'].includes(getNodeTypeFromName(node))).length;
      i++
    ) {
      const otherNodeName: string = graph.nodeNames.filter((node) =>
        ['lower-case', 'end'].includes(getNodeTypeFromName(node))
      )[i];

      if (otherNodeName !== adjNodeName) {
        const otherNodeType: NodeType = getNodeTypeFromName(otherNodeName);

        if (otherNodeType === 'end' && localPathList.filter((pathNode) => pathNode === otherNodeName).length > 0) {
          return false;
        }

        if (
          otherNodeType === 'lower-case' &&
          localPathList.filter((pathNode) => pathNode === otherNodeName).length > 1
        ) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}

function printAllPaths(sourceNodeName: string, destNodeName: string): void {
  const visitedNodeNames: { [key: string]: boolean } = {};
  const pathList: string[] = [sourceNodeName];

  printAllPathUtil(sourceNodeName, destNodeName, visitedNodeNames, pathList);
}

function printAllPathUtil(
  node1Name: string,
  node2Name: string,
  visitedNodeNames: { [key: string]: boolean },
  localPathList: string[]
): void {
  if (node1Name === node2Name) {
    pathCount++;
    return;
  }

  visitedNodeNames[node1Name] = true;

  for (let i = 0; i < graph.adjMap[node1Name].length; i++) {
    if (isProceedableNode(node1Name, i, localPathList)) {
      localPathList.push(graph.adjMap[node1Name][i]);

      const length: number = localPathList.length;
      printAllPathUtil(graph.adjMap[node1Name][i], node2Name, visitedNodeNames, localPathList);
      localPathList.splice(length - 1, 1);
    }
  }

  visitedNodeNames[node1Name] = false;
}

rawPaths.forEach((path: string) => {
  const node1Name: string = path.split('-')[0];
  const node2Name: string = path.split('-')[1];

  if (!graph.nodeNames.includes(node1Name)) {
    graph.nodeNames.push(node1Name);
    initAdjMapNode(node1Name);
  }

  if (!graph.nodeNames.includes(node2Name)) {
    graph.nodeNames.push(node2Name);
    initAdjMapNode(node2Name);
  }

  addAdjNodes(node1Name, node2Name);
});

console.log('🚀 ~ file: index.ts ~ line 155 ~ addAdjNode ~ graph', graph);

printAllPaths(NodeName.START, NodeName.END);

console.log('🚀 ~ file: index.ts ~ line 159 ~ pathCount', pathCount);
