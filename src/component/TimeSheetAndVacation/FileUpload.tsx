import { upload } from "@testing-library/user-event/dist/upload";
import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, Input, Segment } from "semantic-ui-react";
// import UploadService from "../services/FileUploadService";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined) as any;
  const [imagePreviews, setImagePreviews] = useState([]) as any;
  const [progressInfos, setProgressInfos] = useState({ val: [] }) as any;
  const [message, setMessage] = useState([]) as any;
  const [imageInfos, setImageInfos] = useState([]) as any;
  const progressInfosRef = useRef(null) as any;

  const selectFiles = (event: any) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files);
    setImagePreviews(images);
    setProgressInfos({ val: [] });
    setMessage([]);
  };
  console.log(imagePreviews);

  const uploadImages = () => {
    const files = Array.from(selectedFiles);

    let progressInfos = files.map((file: any) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: progressInfos,
    };

    const uploadPromises = files.map((file: any, i: any) => upload(i, file));

    // Promise.all(uploadPromises)
    //   .then(() => UploadService.getFiles())
    //   .then((files) => {
    //     setImageInfos(files.data);
    //   });

    setMessage([]);
  };

  // const upload = (idx: number, file: unknown) => {
  //   let progressInfos = [...progressInfosRef.current.val];
  //   // return UploadService.upload(file, (event: { loaded: number; total: number; }) => {
  //     progressInfos[idx].percentage = Math.round(
  //       (100 * event.loaded) / event.total
  //     );
  //     setProgressInfos({ val: progressInfos });
  //   })
  //     .then(() => {
  //       setMessage((prevMessage: any) => [
  //         ...prevMessage,
  //         "Uploaded the image successfully: " + file.name,
  //       ]);
  //     })
  //     .catch(() => {
  //       progressInfos[idx].percentage = 0;
  //       setProgressInfos({ val: progressInfos });

  //       setMessage((prevMessage: any) => [
  //         ...prevMessage,
  //         "Could not upload the image: " + file.name,
  //       ]);
  //     });
  // };

  // useEffect(() => {
  //   UploadService.getFiles().then((response: { data: any; }) => {
  //     setImageInfos(response.data);
  //   });
  // }, []);

  const removeImg = (i: any) => {
    console.log(i);
    let imgPre = [...imagePreviews];
    imgPre.splice(i, 1);
    setImagePreviews(imgPre);
    let selectFile = [...selectedFiles];
    console.log(selectFile);
    selectFile.splice(i, 1);
    setSelectedFiles(selectFile);
  };
  console.log(selectedFiles);

  return (
    <div>
      <Segment style={{ minHeight: "30vh" }} className="timeSheetBg">
        <Grid >
          <Grid.Row width={16}>
            <Grid.Column className="alginbtn"  width={8} >
              <Input
                type="file"
                label="Select The Images"
                multiple
                accept="image/*"
                onChange={selectFiles}
                className="inputfile"
                id="embedpollfileinput"
              />
              <label
                htmlFor="embedpollfileinput"
                className="ui  floated button"
              >
                <i className="cart arrow down icon"></i>
                Select Files
              </label>

              {/* <Input type="button" className="inputfile" id="embedpollfileinput"  accept="image/*" multiple  onChange={selectFiles}/>

  <label htmlFor="embedpollfileinput" className="ui huge green left floated button">
    <i className="ui upload icon"></i> 
    Select Files
  </label> */}
            </Grid.Column>

            <Grid.Column  className="alginbtn" width={8} >
              {/* <Button
            disabled={!selectedFiles}
            onClick={uploadImages}
          >
            Upload
          </Button> */}
              <Input
                type="button"
                className="inputfile"
                id="embedpollfileinput"
                disabled={!selectedFiles}
                // onClick={uploadImages}
              />

              <label
                // htmlFor="embedpollfileinput"
                className="ui  floated button"
              >
                <i className="ui upload icon"></i>
                Upload
              </label>
            </Grid.Column>
          </Grid.Row>
          {progressInfos &&
            progressInfos.val.length > 0 &&
            progressInfos.val.map(
              (
                progressInfo: {
                  fileName:
                    any,
                  percentage:
                    any
                },
                index: any
              ) => (
                <div className="mb-2" key={index}>
                  <span>{progressInfo.fileName}</span>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-info"
                      role="progressbar"
                      // aria-valuenow={progressInfo.percentage}
                      // aria-valuemin="0"
                      // aria-valuemax="100"
                      style={{ width: progressInfo.percentage + "%" }}
                    >
                      {progressInfo.percentage}%
                    </div>
                  </div>
                </div>
              )
            )}

          {imagePreviews && (
            <div className="rowImg">
              {imagePreviews.map((img: any, i: any) => {
                return (
                  <div className="columnImg">
                    <div className="buttonImg">
                      {" "}
                      <i
                        className="fa bg fa-circle-xmark fa-2x"
                        onClick={() => removeImg(i)}
                      ></i>
                    </div>
                    <img
                      id="preview-image"
                      className="preview"
                      src={img}
                      alt={"image-" + i}
                      key={i}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {message.length > 0 && (
            <div className="alert alert-secondary mt-2" role="alert">
              <ul>
                {message.map(
                  (
                    item:
                     any,
                    i: any
                  ) => {
                    return <li key={i}>{item}</li>;
                  }
                )}
              </ul>
            </div>
          )}

          {imageInfos.length > 0 && (
            <div className="card mt-3">
              <div className="card-header">List of Images</div>
              <ul className="list-group list-group-flush">
                {imageInfos &&
                  imageInfos.map(
                    (
                      img: {
                        url: string | undefined;
                        name:
                         any;
                      },
                      index: any
                    ) => (
                      <li className="list-group-item" key={index}>
                        <p>
                          <a href={img.url}>{img.name}</a>
                        </p>
                        <img src={img.url} height="80px" />
                      </li>
                    )
                  )}
              </ul>
            </div>
          )}
        </Grid>
      </Segment>
    </div>
  );
};

export default FileUpload;
