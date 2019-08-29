export default function SaveDialog({
  dialogOpen,
  setDialogOpen,
  setEmailSaved
}) {
  return (
    <dialog open={dialogOpen}>
      <div className="content-container">
        <div className="header">
          <h2>Enter your email to save the page and get an edit link</h2>
        </div>
        <div className="input-container">
          <input type="text" />
          <button
            onClick={() => {
              setEmailSaved(true);
              setDialogOpen(false);
            }}
          >
            save
          </button>
        </div>
      </div>
      <style jsx>{`
        dialog[open] {
          background: gold;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .header h2 {
          font-size: 16px;
          width: 284px;
        }
        .content-container {
          height: 144px;
          width: 300px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
      `}</style>
    </dialog>
  );
}
