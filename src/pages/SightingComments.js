import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SightingComments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentsArr, setCommentsArr] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      const getComments = async () => {
        const response = await axios.get(
          `http://localhost:8080/sightings/${id}/comments`
        );
        console.log(response);
        setCommentsArr(response.data.comments);
      };

      getComments();
    }
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8080/sightings/${id}/comments`,
      {
        content: comment,
      }
    );
    console.log(response);
    setComment("");
    setCommentsArr((prevState) => [...prevState, response.data]);
  };

  return (
    <div>
      <form className="form">
        Comments for Report ID: {id}
        <br />
        <br />
        {commentsArr.length > 0 ? (
          commentsArr.map((comment) => (
            <div key={comment.id}>{comment.content}</div>
          ))
        ) : (
          <p>No comments</p>
        )}
        <label className="comment-label">Add Comment</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          <button
            className="btn"
            style={{ backgroundColor: "gray" }}
            onClick={() => navigate(`/sightings/${id}`)}
          >
            Back
          </button>
          <button className="btn" onClick={addComment}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SightingComments;
