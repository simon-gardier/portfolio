---
title: "Feed-Forward Novel View Synthesis For Soccer Scenes With Priors"
authors: ["Simon Gardier", "Cédric Hons", "Floriane Magera", "Quentin Massoz", "Anthony Cioppa"]
publishedAt: 2026-07-01
link: "http://hdl.handle.net/2268.2/26108"
image: "/images/publications/ff-nvs-soccer.png"
---

Novel View Synthesis (NVS) for soccer broadcasting would enable new production
effects such as free-viewpoint replays, 3D camera transitions, immersive 3D analyses,
etc. State-of-the-art NVS pipelines based on Neural Radiance Field (NeRF) and
3D Gaussian Splatting (3DGS) produce high-quality novel views.

This work answers what a sparse-input feed-forward NVS pipeline made for soccer
scenes would look like. We propose a modular four-stage architecture. A frozen 3D
foundation model that outputs a coarse point cloud from a sparse input, a per-view
depth alignment that aligns this point cloud to the broadcast world frame using the
pitch as a reference, a learnable Dense Prediction Transformer (DPT) Gaussian head
that regresses 3D Gaussians from the features of the foundation model, and a 3DGS
rasterizer that renders novel views in real time. The pipeline is trained and evaluated
on a feed-forward training and validation split that we create from SoccerNet-NVS.
