import { Cell, Column, Row, Table, TableHeader, TableBody } from 'react-aria-components';
import * as React from 'react';
import { useState } from 'react';
import { TableCheckbox } from '../checkbox/TableCheckbox.tsx';
import styles from './branchesTable.module.css';
import './table.css';

const data = [
  {
    id: 7098,
    name: 'Some Branch Name: 7098',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7198,
    name: 'Some Branch Name: 7198',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7298,
    name: 'Some Branch Name: 7298',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7398,
    name: 'Some Branch Name: 7398',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7498,
    name: 'Some Branch Name: 7498',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7598,
    name: 'Some Branch Name: 7598',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7698,
    name: 'Some Branch Name: 7698',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7798,
    name: 'Some Branch Name: 7798',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
  {
    id: 7898,
    name: 'Some Branch Name: 7898',
    startTime: '2025-02-17 20:00:00',
    total: 50,
    failed: 10,
    duration: '6h 05m',
  },
];

interface BranchesTableProps {
  selectedLaunches: number[];
  setSelectedLaunches: React.Dispatch<React.SetStateAction<number[]>>;
}

export const BranchesTable: React.FC<BranchesTableProps> = ({
  selectedLaunches,
  setSelectedLaunches,
}) => {
  const [hoveredLaunchRow, setHoveredLaunchRow] = useState<number | null>(null);

  return (
    <div className={styles.branchesContainer}>
      <Table aria-label="branches">
        <TableHeader>
          <Column></Column>
          <Column isRowHeader={true}>Branch</Column>
          <Column>Start Time</Column>
          <Column>Total</Column>
          <Column>Failed</Column>
          <Column>Duration</Column>
        </TableHeader>
        <TableBody>
          {data.map((launch) => (
            <Row key={launch.id}>
              <Cell>
                <TableCheckbox
                  launchId={launch.id}
                  selectedLaunches={selectedLaunches}
                  setSelectedLaunches={setSelectedLaunches}
                  hoveredLaunchRow={hoveredLaunchRow}
                  setHoveredLaunchRow={setHoveredLaunchRow}
                />
              </Cell>
              <HoverableCell
                value={launch.name}
                launchId={launch.id}
                setHoveredLaunchRow={setHoveredLaunchRow}
              />
              <HoverableCell
                value={launch.startTime}
                launchId={launch.id}
                setHoveredLaunchRow={setHoveredLaunchRow}
              />
              <HoverableCell
                value={launch.total}
                launchId={launch.id}
                setHoveredLaunchRow={setHoveredLaunchRow}
              />
              <HoverableCell
                value={launch.failed}
                launchId={launch.id}
                setHoveredLaunchRow={setHoveredLaunchRow}
              />
              <HoverableCell
                value={launch.duration}
                launchId={launch.id}
                setHoveredLaunchRow={setHoveredLaunchRow}
              />
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const HoverableCell: React.FC<{
  value: string | number;
  launchId: number;
  setHoveredLaunchRow: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ value, launchId, setHoveredLaunchRow }) => (
  <Cell>
    <div
      onMouseEnter={() => setHoveredLaunchRow(launchId)}
      onMouseLeave={() => setHoveredLaunchRow(null)}
      className={styles.branchesTableCell}
    >
      {value}
    </div>
  </Cell>
);
