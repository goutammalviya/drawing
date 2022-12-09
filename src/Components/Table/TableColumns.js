import React from "react";
export const VendorsColumns = [
    {
        Header: 'address',
        accessor: 'address'
    },
    {
        Header: 'company name',
        accessor: 'company name'
    },
    {
        Header: 'contact no',
        accessor: 'contact no'
    },
    {
        Header: 'contact person name',
        accessor: 'contact person name'
    },
    {
        Header: 'email',
        accessor: 'email'
    },
    {
        Header: 'email address',
        accessor: 'email address'
    },
    {
        Header: 'linkedIn url',
        accessor: 'linkedIn url'
    },
    {
        Header: 'location',
        accessor: 'location'
    },
    {
        Header: 'profile name',
        accessor: 'profile name'
    },
    {
        Header: 'vendor list category',
        accessor: 'vendor list category'
    },
    {
        Header: 'website url',
        accessor: 'website url'
    },
    {
        Header: 'Action',
        accessor: 'Action',
        Cell: ({ row: { original } }) => {
            console.log(original);
			return (
				<>
					<span className='' onClick={()=>original.delete()}>
						delete
					</span>
					<span className='px-1'>
						000
					</span>
					<span className=''>
						000
					</span>
				</>
			)
		}
    },
]

