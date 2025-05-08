import { useEffect, useState } from "react";
import Stories2 from "react-insta-stories";

const Stories = () => {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyIsClosed, setIsStoryClosed] = useState(false);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((res) => res.json())
      .then((data) => {
        // Transform the data to match react-insta-stories format
        const formattedStories = data.map((item) => ({
          url: item.download_url, // Use the image URL
          type: "image", // Specify the type (optional, depending on library version)
        }));
        setPics(formattedStories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    storyIsClosed && (
      <Stories2
        stories={pics}
        defaultInterval={1500}
        width={432}
        height={768}
      />
    )
  );
};

export default Stories;
