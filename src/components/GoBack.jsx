export const GoBack = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="w-6 h-6 rounded-full p-1 bg-blue-200 dark:bg-gray-700"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 256 256"
      >
        <path
          className="dark:fill-slate-50 fill-black"
          d="M125.5,16.2c-0.9,0.2-2.3,0.7-3,1.1S96.7,42.4,66.8,72.1C9.5,129.4,10,128.8,10,133.9c0,4.3,2.8,8.5,6.9,10.4c1.9,0.9,3.8,1.1,15.4,1.1h13.1v47.4v47.4h29.4h29.4v-29.6v-29.6H128h23.8v29.6v29.6h29.4h29.4v-47.4v-47.4h13.3c12.1,0,13.5-0.1,15.5-1.1c4-2.1,6.7-6.4,6.7-10.9c-0.1-4.4-0.3-4.7-56.1-60.6c-29.6-29.6-54.8-54.5-56.1-55.2C131.3,16.2,127.9,15.6,125.5,16.2z"
        />
      </svg>
    </button>
  );
};
