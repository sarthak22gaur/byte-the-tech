import { useState } from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

const TagsForm: React.FC = () => {



    const [tags, setTags] = useState<string[]>([]);

    const addTags = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="m-4 p-4">
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        <i className="material-icons" onClick={() => removeTags(index)} >close</i>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
            />
        </div>
    );
//   const [isKeyReleased, setIsKeyReleased] = useState(false);
//   const [input, setInput] = useState("");
//   const [tags, setTags] = useState<string[]>([]);

//   const onChange = (e) => {
//     const { value } = e.target;
//     setInput(value);
//   };

//   const onKeyDown = (e) => {
//     const { key } = e;
//     const trimmedInput = input.trim();

//     if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
//       e.preventDefault();
//       setTags(prevState => [...prevState, trimmedInput]);
//       setInput("");
//     }

//     if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
//       const tagsCopy = [...tags];
//       const poppedTag = tagsCopy.pop();
//       e.preventDefault();
//       setTags(tagsCopy);
//       setInput(poppedTag);
//     }

//     setIsKeyReleased(false);
//   };

//   const deleteTag = (index) => {
//     setTags(prevState => prevState.filter((tag, i) => i !== index))
//   }

//   const onKeyUp = () => {
//     setIsKeyReleased(true);
//   };

//   return (
//     <div className="p-4 m-4">
//     {tags.map((tag, index) => <div className="tag" key={index}>{tag} {tag}
//     <button onClick={() => deleteTag(index)}>x</button></div>)}
//       <input
//         value={input}
//         placeholder="Enter a tag"
//         onKeyDown={onKeyDown}
//         onKeyUp={onKeyUp}
//         onChange={onChange}
//       />
//     </div>
//   );
};

export default TagsForm;
