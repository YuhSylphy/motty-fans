import { TreeItem, TreeView } from "@material-ui/lab";
import * as React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { HorseDef } from "../../horse-defs/core/horse";

type Datum = {
  id: string;
  className?: string;
  children: Datum[];
};

const construct = (defs: HorseDef[]): Datum[] => {
  return [
    {
      id: "root",
      children: [
        {
          id: "child1",
          children: [],
        },
        {
          id: "child2",
          children: [
            {
              id: "grand-child1",
              children: [],
            },
          ],
        },
      ],
    },
  ];
};

const render = (node: Datum) => {
  return (
    <TreeItem key={node.id} nodeId={node.id} label={node.id}>
      {node.children.map(render)}
    </TreeItem>
  );
};

export const MareLineTree: React.FC = () => {
  const defs = useSelector((state: RootState) => state.horseDefs.list);
  const nodes = useMemo(() => construct(defs), [defs]);

  return (
    <React.Fragment>
      <TreeView>{nodes.map(render)}</TreeView>
    </React.Fragment>
  );
};
