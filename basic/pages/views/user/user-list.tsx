import React from 'react';
import { NextPageContext } from 'next';

interface UserListProps {
  users: User[];
}

interface User {
  id: string;
  name: string;
  age: number;
}

function UserList({ users }: UserListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
        </tr>
      </thead>
      <tbody>
        {// Server로 부터 받아온 사용자 목록을 화면에 보여준다
        users.map(user => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

UserList.getInitialProps = (ctx: NextPageContext) => {
  // Server에서 사용자 목록을 가져온다
  const { users } = ctx.query;
  return { users };
};

export default UserList;
