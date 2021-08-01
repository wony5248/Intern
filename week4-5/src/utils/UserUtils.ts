const createUserObjects = (owners:any, admins:any, collaborators:any) => {
    const nextUserObjects:any = {}
    for (let i = 0; i < owners.length; i++) {
      const { email } = owners[i]
      nextUserObjects[email] = {
        ...owners[i]
      }
    }
    for (let i = 0; i < admins.length; i++) {
      const { email } = admins[i]
      nextUserObjects[email] = {
        ...admins[i]
      }
    }
    for (let i = 0; i < collaborators.length; i++) {
      const { email } = collaborators[i]
      nextUserObjects[email] = {
        ...collaborators[i]
      }
    }
  
    return nextUserObjects
  }
  
  export default {
    createUserObjects
  }