import { Table } from '@radix-ui/themes';
import React from 'react';

type TableData = { [key: string]: string | number | boolean | object | null };

interface DataTableProps {
  data: TableData[];
  classNames?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, classNames }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className={`w-max h-screen ${classNames}`}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.ColumnHeaderCell key={header}>{header}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              {headers.map((header, idx) => (
                <Table.Cell key={idx}>
                  {typeof item[header] === 'object' && item[header] !== null
                    ? JSON.stringify(item[header])
                    : item[header] as string | number | boolean}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default DataTable;
