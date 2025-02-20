import {
    Cell,
    Column,
    Row,
    Table,
    TableHeader,
    TableBody,
} from "react-aria-components";

export const BranchesTable = () => (
    <>
        <div className="branches-container">
            <Table aria-label="branches">
                <TableHeader>
                    <Column isRowHeader={true}>Branch</Column>
                    <Column>Start Time</Column>
                    <Column>State</Column>
                    <Column>Duration</Column>
                </TableHeader>
                <TableBody>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Success</Cell>
                        <Cell>11h 05m</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Failed</Cell>
                        <Cell>None</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Success</Cell>
                        <Cell>11h 05m</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Failed</Cell>
                        <Cell>None</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Success</Cell>
                        <Cell>11h 05m</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Failed</Cell>
                        <Cell>None</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Success</Cell>
                        <Cell>11h 05m</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Failed</Cell>
                        <Cell>None</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Success</Cell>
                        <Cell>11h 05m</Cell>
                    </Row>
                    <Row>
                        <Cell>Some Branch Name</Cell>
                        <Cell>2025-02-17 20:00:00</Cell>
                        <Cell>Failed</Cell>
                        <Cell>None</Cell>
                    </Row>

                </TableBody>
            </Table>
        </div>
    </>
)