import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../../../../store/modules/Users';

export default function UsersList() {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  function onRemoveUser(index) {
    dispatch(removeUser(index))
  }

  const userRowTemplate = () => users.map((user, index) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.type}</td>
      <td><button onClick={() => onRemoveUser(index)}>Delete</button></td>
    </tr>
  ))

  return (
    <div className="ss-users-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userRowTemplate()}
        </tbody>
      </table>
    </div>
  )
}