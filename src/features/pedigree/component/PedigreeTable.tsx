import { makeStyles, createStyles, Theme } from "@material-ui/core";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";

import { HorseDef } from "../../horse-defs";

export interface PedigreeTableProps {
  def: HorseDef;
}

type PedigreeNode = {
  name: string;
  generation: number;
  show: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      "& .cell": {
        "&.empty": {
          backgroundColor: "lightgray",
        },
      },
    },
  })
);

const construct = (map: Map<string, HorseDef>) => (
  def: HorseDef
): PedigreeNode[][] => {
  const table = new Array<PedigreeNode[]>();

  for (let row = 0; row < 32; ++row) {
    const cols = new Array<PedigreeNode>();
    for (let col = 0; col < 5; ++col) {
      cols.push({ name: "empty", generation: col, show: false });
    }
    table.push(cols);
  }

  const limit = 5;
  const mapPedigree = (row: number, col: number, def: HorseDef) => {
    table[row][col] = {
      name: def.name,
      generation: 0,
      show: !!def.show,
    };

    if (col + 1 < limit) {
      if (def.fatherName) {
        if (map.has(def.fatherName)) {
          mapPedigree(row, col + 1, map.get(def.fatherName)!);
        } else {
          mapPedigree(row, col + 1, {
            name: `${def.fatherName}`,
            sex: "male",
            system: "Uk",
            listed: false,
            show: true,
            owned: false,
            memo: ["未定義"],
          });
        }
      }
      if (def.motherName) {
        if (map.has(def.motherName)) {
          mapPedigree(
            row + 2 ** (limit - col - 1),
            col + 1,
            map.get(def.motherName)!
          );
        } else {
          mapPedigree(row + 2 ** (limit - col - 1), col + 1, {
            name: `${def.motherName}(DATA NOT FOUND)`,
            sex: "female",
            system: "Uk",
            listed: false,
            show: true,
            owned: false,
            memo: ["未定義"],
          });
        }
      }
    }
  };

  mapPedigree(0, 0, def);
  return table;
};

const renderCell = (
  row: number,
  col: number,
  cell: PedigreeNode
): JSX.Element => {
  const threshold = 2 ** (4 - col);
  return (
    <React.Fragment key={`col-${col}`}>
      {row % threshold === 0 ? (
        <TableCell
          rowSpan={threshold}
          className={["cell", cell.show ? "" : "empty"].join(" ")}
        >
          {cell.show ? <Box>{cell.name}</Box> : <Box />}
        </TableCell>
      ) : null}
    </React.Fragment>
  );
};

const render = (data: PedigreeNode[][]): JSX.Element => {
  return (
    <React.Fragment>
      {data.map((cols, row) => (
        <TableRow key={`row-${row}`}>
          {cols
            .filter((_, ix) => ix > 0)
            .map((cell, col) => renderCell(row, col, cell))}
        </TableRow>
      ))}
    </React.Fragment>
  );
};

export const PedigreeTable: React.FC<PedigreeTableProps> = ({ def }) => {
  const classes = useStyles();
  const defs = useSelector((state: RootState) => state.horseDefs.list);
  const map = useMemo(
    () =>
      defs.reduce(
        (map, def) => map.set(def.name, def),
        new Map<string, typeof defs[number]>()
      ),
    [defs]
  );

  const array = construct(map)(def);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody>{render(array)}</TableBody>
      </Table>
    </TableContainer>
  );
};
