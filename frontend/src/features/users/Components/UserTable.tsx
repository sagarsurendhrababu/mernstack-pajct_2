import {
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import type { UserResponse, UserPagination } from "../page/Users";
import { useState } from "react";
import { useApi } from "../../../shared/hooks/useApi";
import {updateUserRole} from '../api/userApi'
//import selectRwo from "../../../shared/utilities/selectRwo";

type UserTableProps = {
  data: {
    pagination: UserPagination;
    response: UserResponse[];
  } | null;
};
interface UserUpdateRoleInput{
    id:string,
    changeRole:string | null
}

function UserTable({ data }: UserTableProps) {
    
  const [editRole, setEditRole] = useState<number | null>(null);
  const [changeRole, setChangeRole] = useState<string | null>(null);
  const {execute} = useApi<UserUpdateRoleInput,string>(updateUserRole)


  const handleRoleChange = (index: number) => {
    setEditRole(index);
  };

  const handleRoleSave = (id:string ) => {
    const payload = {id, changeRole}
    execute(payload)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>SI</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.response.map((items, index) => (
            <TableRow
              key={items._id}
              style={editRole === index? {background:'yellow'} : {background:'none'}}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{items.email}</TableCell>
              <TableCell>
                {editRole == index ? (
                  <Select
                    size="small"
                    value={changeRole?? items.role}
                    sx={{height: 25, fontSize: 13, }}                    
                    onChange={(e) => setChangeRole(e.target.value)}
                  >                    
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                ) :  items.role }
              </TableCell>
              <TableCell>{items.createdAt}</TableCell>
              <TableCell>
                {editRole == index? (
                <Button size="small"  sx={{fontSize: 11, }}  variant="contained" onClick={() => handleRoleSave(items._id)}>
                  save
                </Button>                    
                ) : (
                <Button size="small"  onClick={() => handleRoleChange(index)}>
                  edit
                </Button>                                   
                )}

                <Button size="small">Active</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
