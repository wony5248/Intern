const annotationImages = {
  box: "https://asset.superb-ai.com/assets/img/navbar_icons/image_bbox.png",
  polyline:
    "https://asset.superb-ai.com/assets/img/navbar_icons/image_keypoint.png",
  polygonSegmentation:
    "https://asset.superb-ai.com/assets/img/navbar_icons/image_segmentation.png",
  keypoint: "https://asset.superb-ai.com/assets/img/icon/keypoint2.png",
  imageCategorization:
    "https://asset.superb-ai.com/assets/img/navbar_icons/categorization_new.png"
};

const dataTypes = [
  {
    name: "Image",
    isAvailable: true,
    img: "https://asset.superb-ai.com/assets/img/icon/image_video_labeling.png",
    annotations: [
      {
        name: "Box",
        img: annotationImages.box
      },
      {
        name: "Polyline",
        img: annotationImages.polyline
      },
      {
        name: "Polygon Segmentation",
        img: annotationImages.polygonSegmentation
      },
      {
        name: "Keypoint",
        img: annotationImages.keypoint
      },
      {
        name: "Image Categorization",
        img: annotationImages.imageCategorization
      }
    ]
  },
  {
    name: "Video",
    isAvailable: false,
    img: "https://asset.superb-ai.com/assets/img/icon/video_labeling.png"
  },
  {
    name: "Text",
    isAvailable: false,
    img: "https://asset.superb-ai.com/assets/img/icon/text_labeling.png"
  }
];

const keypointTemplates = [
  {
    name: "Facial Keypoint",
    img:
      "https://asset.superb-ai.com/assets/img/keypoint_saba/facial_keypoints_template_15.png",
    edges: [
      {
        from: 0,
        to: 1,
        color: "#64b5f6"
      },
      {
        from: 0,
        to: 2,
        color: "#64b5f6"
      },
      {
        from: 3,
        to: 4,
        color: "#ff8a65"
      },
      {
        from: 3,
        to: 5,
        color: "#ff8a65"
      },
      {
        from: 6,
        to: 7,
        color: "#64b5f6"
      },
      {
        from: 8,
        to: 9,
        color: "#ff8a65"
      },
      {
        from: 11,
        to: 13,
        color: "#64b5f6"
      },
      {
        from: 11,
        to: 14,
        color: "#64b5f6"
      },
      {
        from: 12,
        to: 13,
        color: "#ff8a65"
      },
      {
        from: 12,
        to: 14,
        color: "#ff8a65"
      }
    ],
    nodes: [
      {
        x: 0.75,
        y: 0.25,
        name: "left eye center",
        color: "#64b5f6",
        opposite: 3
      },
      {
        x: 0.625,
        y: 0.25,
        name: "left eye inner corner",
        color: "#64b5f6",
        opposite: 4
      },
      {
        x: 0.875,
        y: 0.25,
        name: "left eye outer corner",
        color: "#64b5f6",
        opposite: 5
      },
      {
        x: 0.25,
        y: 0.25,
        name: "right eye center",
        color: "#ff8a65"
      },
      {
        x: 0.375,
        y: 0.25,
        name: "right eye inner corner",
        color: "#ff8a65"
      },
      {
        x: 0.125,
        y: 0.25,
        name: "right eye outer corner",
        color: "#ff8a65"
      },
      {
        x: 0.625,
        y: 0,
        name: "left eyebrow inner end",
        color: "#64b5f6",
        opposite: 8
      },
      {
        x: 1,
        y: 0,
        name: "left eyebrow outer end",
        color: "#64b5f6",
        opposite: 9
      },
      {
        x: 0.375,
        y: 0,
        name: "right eyebrow inner end",
        color: "#ff8a65"
      },
      {
        x: 0,
        y: 0,
        name: "right eyebrow outer end",
        color: "#ff8a65"
      },
      {
        x: 0.5,
        y: 0.5,
        name: "nose tip",
        color: "#d50000"
      },
      {
        x: 0.75,
        y: 0.875,
        name: "mouth left corner",
        color: "#64b5f6",
        opposite: 12
      },
      {
        x: 0.25,
        y: 0.875,
        name: "mouth right corner",
        color: "#ff8a65"
      },
      {
        x: 0.5,
        y: 0.75,
        name: "mouth center top lip",
        color: "#d50000"
      },
      {
        x: 0.5,
        y: 1,
        name: "mouth center bottom lip",
        color: "#d50000"
      }
    ]
  },
  {
    name: "Human Pose",
    img:
      "https://asset.superb-ai.com/assets/img/keypoint_saba/human_pose_template_17.png",
    edges: [
      {
        from: 4,
        to: 2,
        color: "#ff8a65"
      },
      {
        from: 2,
        to: 0,
        color: "#ff8a65"
      },
      {
        from: 6,
        to: 8,
        color: "#ff8a65"
      },
      {
        from: 8,
        to: 10,
        color: "#ff8a65"
      },
      {
        from: 6,
        to: 12,
        color: "#ff8a65"
      },
      {
        from: 12,
        to: 14,
        color: "#ff8a65"
      },
      {
        from: 14,
        to: 16,
        color: "#ff8a65"
      },
      {
        from: 2,
        to: 1,
        color: "#4db6ac"
      },
      {
        from: 6,
        to: 5,
        color: "#4db6ac"
      },
      {
        from: 12,
        to: 11,
        color: "#4db6ac"
      },
      {
        from: 0,
        to: 1,
        color: "#64b5f6"
      },
      {
        from: 1,
        to: 3,
        color: "#64b5f6"
      },
      {
        from: 5,
        to: 7,
        color: "#64b5f6"
      },
      {
        from: 7,
        to: 9,
        color: "#64b5f6"
      },
      {
        from: 5,
        to: 11,
        color: "#64b5f6"
      },
      {
        from: 11,
        to: 13,
        color: "#64b5f6"
      },
      {
        from: 13,
        to: 15,
        color: "#64b5f6"
      }
    ],
    nodes: [
      {
        v: 1,
        x: 0.5,
        y: 0.1,
        name: "nose",
        color: "#d50000"
      },
      {
        v: 1,
        x: 0.55,
        y: 0.05,
        name: "left_eye",
        color: "#64b5f6",
        opposite: 2
      },
      {
        v: 1,
        x: 0.45,
        y: 0.05,
        name: "right_eye",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.6,
        y: 0.075,
        name: "left_ear",
        color: "#64b5f6",
        opposite: 4
      },
      {
        v: 1,
        x: 0.4,
        y: 0.075,
        name: "right_ear",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.65,
        y: 0.2,
        name: "left_shoulder",
        color: "#64b5f6",
        opposite: 6
      },
      {
        v: 1,
        x: 0.35,
        y: 0.2,
        name: "right_shoulder",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.85,
        y: 0.3,
        name: "left_elbow",
        color: "#64b5f6",
        opposite: 8
      },
      {
        v: 1,
        x: 0.15,
        y: 0.3,
        name: "right_elbow",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.75,
        y: 0.45,
        name: "left_wrist",
        color: "#64b5f6",
        opposite: 10
      },
      {
        v: 1,
        x: 0.25,
        y: 0.45,
        name: "right_wrist",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.62,
        y: 0.5,
        name: "left_hip",
        color: "#64b5f6",
        opposite: 12
      },
      {
        v: 1,
        x: 0.38,
        y: 0.5,
        name: "right_hip",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.6,
        y: 0.7,
        name: "left_knee",
        color: "#64b5f6",
        opposite: 14
      },
      {
        v: 1,
        x: 0.4,
        y: 0.7,
        name: "right_knee",
        color: "#ff8a65"
      },
      {
        v: 1,
        x: 0.6,
        y: 0.9,
        name: "left_ankle",
        color: "#64b5f6",
        opposite: 16
      },
      {
        v: 1,
        x: 0.4,
        y: 0.9,
        name: "right_ankle",
        color: "#ff8a65"
      }
    ]
  }
];

const COLOR_CHIP_PALETTE = [
  "#FF625A",
  "#F89400",
  "#FFCC00",
  "#A3EB57",
  "#4AE2B9",
  "#5A7BEF",
  "#6648FF",
  "#A6A6A6"
];

export { annotationImages, dataTypes, keypointTemplates, COLOR_CHIP_PALETTE };
