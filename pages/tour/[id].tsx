import { useRouter } from "next/router";

const TourDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Tour Detail Page</h1>
      <p>Tour ID: {id}</p>
    </div>
  );
};

export default TourDetailPage;
