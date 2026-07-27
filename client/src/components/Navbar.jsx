function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Lead Management</h1>

      <div>
        Welcome, <strong>{user?.name}</strong>
      </div>
    </div>
  );
}

export default Navbar;