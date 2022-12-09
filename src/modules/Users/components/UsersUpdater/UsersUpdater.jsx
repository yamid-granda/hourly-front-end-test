import { useState } from 'react'
import { useDispatch } from 'react-redux';
import Input from "../../../../components/Input/Input";
import SingleSelect from "../../../../components/SingleSelect/SingleSelect";
import { updateUser } from '../../../../store/modules/Users';

export default function UsersUpdater() {
  const [formData, setFormData] = useState({
    name: '',
    type: null,
  });

  const dispatch = useDispatch()

  function onNameInput(event) {
    setFormData({ ...formData, name: event.target.value })
  }

  function onTypeChange(type) {
    setFormData({ ...formData, type })
  }

  function onSubmit(event) {
    event.preventDefault()
    dispatch(updateUser({
      ...formData,
      id: Math.floor(Math.random() * 10_000),
      index: 1,
    }))
  }

  return (
    <div className="ss-users-creator">
      <form onSubmit={onSubmit}>
        <Input
          value={formData.name}
          onInput={onNameInput}
        />

        <SingleSelect
          value={formData.type}
          onChange={onTypeChange}
          options={[
            { value: 'team-leader', text: 'Team leader' },
            { value: 'analyst', text: 'Analyst' },
            { value: 'admin', text: 'Admin' },
          ]}
          name="type"
        />

        <button>Save</button>
      </form>
    </div>
  )
}