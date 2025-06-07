import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Home/Carousel";
import EventBoard from "../components/Home/EventBoard";
import NoticeBoard from "../components/Home/NoticeBoard";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [notices, setNotices] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/gallery");
        const data = res.data.photos;
        const formattedSlides = data.map((item, index) => ({
          id: item._id,
          image: item.imageUrl,
          alt: `Slide ${index + 1}`,
          caption:
            item.caption ||
            `Uploaded on ${new Date(item.uploadedAt).toLocaleDateString()}`,
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      }
    };

    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/pdf");
        setNotices(res.data);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/events/get");
        setUpcomingEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchImages();
    fetchNotices();
    fetchEvents();
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <Carousel slides={slides} />

      <p className="text-center text-sm text-gray-600 mt-2">
        Click on the links above to navigate
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <EventBoard events={upcomingEvents} />
        <NoticeBoard notices={notices} />
      </div>
    </div>
  );
};

export default Home;
