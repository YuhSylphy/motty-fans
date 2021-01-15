import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RemoveIcon from "@material-ui/icons/Remove";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { HorseDef } from "../../horse-defs/core/horse";

type Datum = {
  id: string;
  label: JSX.Element;
  className?: string;
  children: Datum[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .name": {
        marginLeft: theme.spacing(0.5),
      },
      "& .father": {
        marginLeft: theme.spacing(1),
      },
      "& .male": {
        color: "#2196f3",
      },
      "& .female": {
        color: "#f44336",
      },
    },
  })
);

const construct = (defs: HorseDef[]): { nodes: Datum[]; ids: string[] } => {
  const roots = new Set<Datum>();
  const map = new Map<string, Datum>();

  const fetchOrCreateNode = (id: string) =>
    map.has(id)
      ? (() => {
          const fetched: Datum = map.get(id)!;
          return fetched;
        })()
      : // 新規
        (() => {
          const created: Datum = {
            id,
            label: <React.Fragment />,
            children: [],
          };
          map.set(id, created);
          return created;
        })();

  const append = (def: HorseDef) => {
    const node = fetchOrCreateNode(def.name);

    node.className = [def.sex].join(" ");
    node.label = (
      <React.Fragment>
        {(() => {
          switch (def.sex) {
            case "male":
              return <FontAwesomeIcon icon={faMars} />;
            case "female":
              return <FontAwesomeIcon icon={faVenus} />;
            case "unknown":
              return null;
            default:
              const __exhaust: never = def.sex; // eslint-disable-line @typescript-eslint/no-unused-vars
          }
        })()}
        <span className="name">{def.name}</span>
        {def.fatherName ? (
          <span className="father male">({def.fatherName})</span>
        ) : null}
      </React.Fragment>
    );

    if (def.motherName) {
      const mother = fetchOrCreateNode(def.motherName);
      mother.children.push(node);
    } else {
      roots.add(node);
    }
  };

  defs.forEach(append);
  return { nodes: Array.from(roots.values()), ids: Array.from(map.keys()) };
};

const render = (toggleExpand: (node: Datum) => React.MouseEventHandler) => (
  node: Datum
) => {
  return (
    <TreeItem
      className={node.className}
      key={node.id}
      nodeId={node.id}
      label={node.label}
      onIconClick={toggleExpand(node)}
    >
      {node.children.map(render(toggleExpand))}
    </TreeItem>
  );
};

export const MareLineTree: React.FC = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string[]>([]);

  const defs = useSelector((state: RootState) => state.horseDefs.list);
  const { nodes, ids } = useMemo(() => construct(defs), [defs]);

  useEffect(() => {
    setExpanded(ids);
  }, [ids]);

  const toggleExpand = useMemo<(node: Datum) => React.MouseEventHandler>(
    () => (node) => (event) => {
      setExpanded(
        expanded.includes(node.id)
          ? expanded.filter((id) => id !== node.id)
          : [...expanded, node.id]
      );
    },
    [expanded, setExpanded]
  );

  return (
    <React.Fragment>
      <TreeView
        className={classes.root}
        expanded={expanded}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultEndIcon={<RemoveIcon />}
      >
        {nodes.map(render(toggleExpand))}
      </TreeView>
    </React.Fragment>
  );
};
