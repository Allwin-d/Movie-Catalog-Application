import { FaTrashAlt } from "react-icons/fa";

export type DeleteModalProps = {
  movieTitle: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({
  movieTitle,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteModalProps) => {
  return (
    // full screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      
      {/*  modal card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* TOP - red section */}
        <div className="flex flex-col items-center border-b border-red-100 bg-red-50 px-5 pb-6 pt-8 text-center sm:px-8">
          
          {/* icon */}
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
              <FaTrashAlt className="text-white text-xl" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Delete this movie?
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-red-600">"{movieTitle}"</span>{" "}
            from the catalog? This action cannot be undone.
          </p>
        </div>

        {/* BOTTOM - action buttons */}
        <div className="flex gap-3 px-5 py-5 sm:px-8">
          {/* cancel button */}
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            Cancel
          </button>

          {/* confirm delete button */}
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <FaTrashAlt />
                Yes, delete
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;