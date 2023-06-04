import { useState } from "react";

const OutlineHeartIcon = () => (
  <path
    d="m1692.48 910.647-732.762 687.36-731.182-685.779c-154.616-156.875-154.616-412.122 0-568.997 74.542-75.558 173.704-117.233 279.304-117.233h.113c105.487 0 204.65 41.675 279.078 117.233l.113.113c74.767 75.783 116.103 176.865 116.103 284.385h112.941c0-107.52 41.224-208.602 116.104-284.498 74.428-75.558 173.59-117.233 279.19-117.233h.113c105.487 0 204.763 41.675 279.19 117.233 154.617 156.875 154.617 412.122 1.695 567.416m78.833-646.701c-95.887-97.355-223.737-150.89-359.718-150.89h-.113c-136.094 0-263.83 53.535-359.604 150.777-37.61 38.061-68.443 80.979-92.16 127.398-23.718-46.42-54.664-89.337-92.16-127.285-95.774-97.355-223.51-150.89-359.605-150.89h-.113c-135.981 0-263.83 53.535-359.83 150.89-197.648 200.696-197.648 526.983 1.694 729.035l810.014 759.868L1771.313 991.4c197.647-200.47 197.647-526.758 0-727.454"
    fill="white"
  />
);

const FilledHeartIcon = () => (
  <g transform="translate(0 -1028.4)">
    <path
      d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
      fill="#e74c3c"
    />
  </g>
);

interface HeartIconProps {
  filled: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({ filled }) => {
  const [isFilled, setIsFilled] = useState<boolean>(filled);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setIsFilled(!isFilled);
  };

  return (
    <svg
      width="25px"
      height="25px"
      viewBox={isFilled ? "0 0 24 24" : "0 0 1920 1920"}
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      {isFilled ? <FilledHeartIcon /> : <OutlineHeartIcon />}
    </svg>
  );
};

export default HeartIcon;
