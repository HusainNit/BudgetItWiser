const EditBudget = ({ user }) => {
  return (
    <>
      {user ? (
        <div className="EditBudgetContainer">
          <h1>edit</h1>
        </div>
      ) : (
        <div className="CantView">
          <h2>
            must <Link to="/signin">Sign In</Link> in to view this page
          </h2>
        </div>
      )}
    </>
  );
};

export default EditBudget;
