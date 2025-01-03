export const Spinner = () => {
  return (
    <div className="space-x-4 space-x-reverse h-20 flex justify-center items-center">
      <svg
        width="60px"
        height="60px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{
          shapeRendering: "auto",
          animationPlayState: "running",
          animationDelay: 0,
          background: "none",
        }}
      >
        <circle
          cx="84"
          cy="50"
          r="1.34307"
          fill="#f0ad4e"
          style={{ animationPlayState: "running", animationDelay: "0" }}
        >
          <animate
            attributeName="r"
            values="10;0;0;0;0"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
          <animate
            attributeName="cx"
            values="84;84;84;84;84"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
        </circle>
        <circle
          cx="79.4336"
          cy="50"
          r="10"
          fill="#5cb85c"
          style={{animationPlayState: "running", animationDelay: 0}}
        >
          <animate
            attributeName="r"
            values="0;10;10;10;0"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="-1s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
          <animate
            attributeName="cx"
            values="16;16;50;84;84"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="-1s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
        </circle>
        <circle
          cx="45.4336"
          cy="50"
          r="10"
          fill="#5bc0de"
          style={{animationPlayState: "running", animationDelay: 0}}
        >
          <animate
            attributeName="r"
            values="0;10;10;10;0"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="-0.5s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
          <animate
            attributeName="cx"
            values="16;16;50;84;84"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="-0.5s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
        </circle>
        <circle
          cx="16"
          cy="50"
          r="8.65693"
          fill="#337ab7"
          style={{animationPlayState: "running", animationDelay: 0}}
        >
          <animate
            attributeName="r"
            values="0;10;10;10;0"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
          <animate
            attributeName="cx"
            values="16;16;50;84;84"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
        </circle>
        <circle
          cx="16"
          cy="50"
          r="0"
          fill="#f0ad4e"
          style={{animationPlayState: "running", animationDelay: 0}}
        >
          <animate
            attributeName="r"
            values="0;0;10;10;10"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
          <animate
            attributeName="cx"
            values="16;16;16;50;84"
            keyTimes="0;0.25;0.5;0.75;1"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            calcMode="spline"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            style={{animationPlayState: "running", animationDelay: 0}}
          />
        </circle>
      </svg>
    </div>
  );
};
