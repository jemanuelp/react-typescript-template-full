export interface CustomHeaderProptypes {
    plan?: string;
    searchTerm: string;
    rowsPerPage: number;
    handleFilter: Function;
    handlePerPage: any;
    handlePlanChange?: Function;
    role?: any;
    setShow?: any;
    handleAssignedToChange?: any;
    assignedTo?: string;
}