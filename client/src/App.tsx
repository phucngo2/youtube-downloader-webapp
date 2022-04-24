import React, { useEffect } from "react";

import "semantic-ui-css/semantic.css";
import "./App.css";
import "./styles/home.css";

import SearchBox from "./components/SearchBox";
import { useLazyFetch } from "./utils/useFetch";
import VideoInfo from "./components/VideoInfo";
import VideoFormats from "./components/VideoFormats";
import Message from "./components/Message";
import VideoConvert from "./components/VideoConvert";
import Loading from "./components/Loading";

function App() {
    const [fetchData, { loading, data, error }] = useLazyFetch("", {});

    const [value, setValue] = React.useState("");

    const [isShown, setIsShown] = React.useState<boolean>(false);

    useEffect(() => {
        setIsShown(false);
    }, [data]);

    const handleSubmit = () => {
        // Validate form
        if (!value.trim()) return;

        // Fetch data
        fetchData("/video", {
            method: "POST",
            data: {
                url: value,
            },
        });
    };

    return (
        <div className="App">
            <div className="container border rounded">
                <h4 className="fs-heading heading">
                    <i className="icon youtube red"></i> Youtube video stalker
                </h4>

                <SearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    handleSubmit={handleSubmit}
                    placeholder={"Patse link here..."}
                    className="w-content py-2"
                />

                {loading && <Loading />}

                {data && (
                    <>
                        <VideoInfo data={data} />

                        <VideoConvert data={data} />

                        {isShown && <VideoFormats data={data} />}

                        <div className="ui horizontal divider w-content">
                            <div
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsShown(!isShown)}
                            >
                                {isShown ? "Show less!" : "Show more!"}
                            </div>
                        </div>
                    </>
                )}

                {error && (
                    <Message
                        message={
                            error.response.data.message ||
                            "Sorry! We could not find your video!"
                        }
                        className="red w-content"
                    />
                )}
            </div>
        </div>
    );
}

export default App;
