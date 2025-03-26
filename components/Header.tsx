export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">Dashboard Admin</div>
      <div className="flex items-center space-x-4">
        <span className="hidden md:block">Admin User</span>
        <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
}
