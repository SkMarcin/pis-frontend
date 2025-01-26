import { useNavigate } from "react-router-dom";

const LoansMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/loans/add-loan", label: "Add Loan" },
    { path: "/loans/user-loans/1", label: "User Loans" },
    { path: "/loans/all-loans", label: "All Loans" },
    { path: "/loans/book-loans/1", label: "Book Loans" },
    { path: "/loans/return-book/1", label: "Return Book" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Loans Management</h2>
      {menuItems.map((item, index) => (
        <button key={index} onClick={() => navigate(item.path)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default LoansMenu;
