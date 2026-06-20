const ErrorMessage = ({ message = "Đã xảy ra lỗi. Vui lòng thử lại sau.", onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center my-8">
      <p className="text-red-700 font-medium mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Thử lại
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
