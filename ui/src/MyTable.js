    import {
      useReactTable,
      getCoreRowModel,
      flexRender,
    } from '@tanstack/react-table';
    import React, { useState, useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { setPagination, setTableData, setPageCount, setColumnFilters } from './tableSlice';

    const MyTable = () => {

      const dispatch = useDispatch();
      const { data, pagination: {pageIndex, pageSize}, pageCount, columnFilters } = useSelector((state) => state.table);
      const [columnVisibility, setColumnVisibility] = useState({
        timestamp: true,
        attackerId: true,
        attackerIp: true,
        attackerName: true,
        attackerPort: false,
        decoyName: true,
        decoyId: false,
        decoyIp: false,
        decoyGroup: false,
        decoyPort: false,   
        decoyType: false,  
        type: true,
        severity: false,
        kill_chain_phase: false,
      });

      // const [pageCount, setPageCount] = useState(0); // Total pages from backend

      // Columns
      const columns = React.useMemo(
        () => [
          {
            accessorKey: 'timestamp',
            header: 'TIME',
          },
          {
            accessorKey: 'attackerId',
            header: 'ID',
          },
          {
            accessorKey: 'attackerIp',
            header: 'IP',
          },
          {
            accessorKey: 'attackerName',
            header: 'NAME',
          },
          {
            accessorKey: 'attackerPort',
            header: 'PORT',
          },
          {
            accessorKey: 'type',
            header: 'TYPE',
          },
          {
            accessorKey: 'severity',
            header: 'SEVERITY',
          },
          {
            accessorKey: 'decoyName',
            header: 'DECOY_NAME',
          },
          {
            accessorKey: 'decoyGroup',
            header: 'DECOY_GROUP',
          },
          {
            accessorKey: 'decoyIp',
            header: 'DECOY_IP',
          },
          {
            accessorKey: 'decoyPort',
            header: 'DECOY_PORT',
          },
          {
            accessorKey: 'decoyType',
            header: 'DECOY_TYPE',
          },
          {
            accessorKey: 'kill_chain_phase',
            header: 'KILL_CHAIN_PHASE'
          }
        ],
        []
      );

      // Fetch data from your API
      useEffect(() => {
        const fetchData = async () => {
          let url = `/api/data?page=${pageIndex + 1}&limit=${pageSize}`;
          if (columnFilters?.length) {
            url = `/api/data?page=${pageIndex + 1}&limit=${pageSize}&columnId=${columnFilters[0]?.id}&columnValue=${columnFilters[0]?.value}`;
          }  
          const response = await fetch(url);
          const result = await response.json();
          // setData(result.posts);
          dispatch(setTableData(result.posts));
          dispatch(setPageCount(result.pageCount));
        };
        fetchData();
      }, [dispatch, pageIndex, pageCount, pageSize, columnFilters]); // Refetch when pagination state changes

      const table = useReactTable({
        data,
        columns,
        pageCount, // Set the total page count from the backend
        state: {
          columnVisibility,
          pageIndex,
          pageSize,
          columnFilters,
        },
        manualFiltering: true,
        manualSorting: true,
        // manualGlobalFilter: true,
        // onPaginationChange: setPagination, // Update pagination state
        onPaginationChange: (updater) => {
          const newPagination = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
          dispatch(setPagination(newPagination));
        }, // coming from redux store now
        manualPagination: true, // Crucial for server-side pagination
        onColumnFiltersChange: (updater) => {
          const newFiltering = typeof updater === 'function' ? updater() : updater;
          dispatch(setColumnFilters(newFiltering));
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
      });

      return (
        <div className=''>
          <div className="inline-block border border-black shadow rounded">
            <div className="px-1 border-b border-black">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                  }}
                />{' '}
                <span>Toggle All</span>
              </label>
            </div>
            {table.getAllColumns().map(column => {
              return (
                <span key={column.id} className="inline px-1">
                  <label className="inline">
                    <input
                      {...{
                        type: 'checkbox',
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{' '}
                    {column.id}
                  </label>
                </span>
              )
            })}
          </div>
          {/* ------ TABLE ------ */}
          <div className="mt-8">
            <table className="w-full border-collapse shadow-md">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th className="px-4 py-2 text-left font-bold text-gray-700 border-b border-gray-300" key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/* Column Filter Input */}
                        {header.column.getCanFilter() ? (
                          <input
                            value={header.column.getFilterValue() ?? ''}
                            onChange={(e) => {
                              return header.column.setFilterValue(e.target.value)
                            }                            }
                            placeholder={`Filter ${header.column.id}`}
                          />
                        ) : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr className="even:bg-gray-50 hover:bg-gray-100" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-4 py-2 border-b border-gray-200" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
              <button
                type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => table.previousPage()}
                // disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
              <div>
                <strong>
                  Page {table.getState().pageIndex + 1} of {table.getPageCount()}
                </strong>
              </div>
            </div> 
          </div>
        </div>
      );
    }

    export default MyTable;