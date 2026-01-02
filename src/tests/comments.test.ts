import request from "supertest";
import intApp from "../index";
import { Express } from "express";
import { commentModel } from "../models/commentModel";
import mongoose from "mongoose";

type CommentData = {
  postId: string;
  description: string;
  userCreatorID: string;
};

const testData: CommentData[] = [
  {
    postId: "648a1f4e2f8fb814c8a1e1a1",
    description: "This is a test comment 1",
    userCreatorID: "507f1f77bcf86cd799439011",
  },
  {
    postId: "648a1f4e2f8fb814c8a1e1a2",
    description: "This is a test comment 2",
    userCreatorID: "648a1f4e2f8fb814c8a1e1b2",
  },
  {
    postId: "648a1f4e2f8fb814c8a1e1a3",
    description: "This is a test comment 3",
    userCreatorID: "648a1f4e2f8fb814c8a1e1b3",
  },
];

let app: Express;
beforeAll(async () => {
  app = await intApp();
});
beforeEach(async () => {
  await commentModel.deleteMany({});
});
afterAll(async () => {
  await commentModel.deleteMany({});
});

describe("Comment API Endpoints", () => {
  test("should create a new comment", async () => {
    for (const data of testData) {
      const res = await request(app).post("/comment").send(data);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.description).toBe(data.description);
      expect(res.body.relatedPostID).toBe(data.postId);
      expect(res.body.userCreatorID).toBe(data.userCreatorID);
    }
  });

  test("should retrieve all comments", async () => {
    for (const data of testData) {
      await request(app).post("/comment").send(data);
    }
    const res = await request(app).get("/comment");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(testData.length);
  });

  test("should retrieve comments for a specific post", async () => {
    for (const data of testData) {
      await request(app).post("/comment").send(data);
    }
    const postId = testData[0].postId;
    const res = await request(app).get(`/comment/post/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].relatedPostID).toBe(postId);
  });
});

test("should update a comment by ID", async () => {
  const createRes = await request(app).post("/comment").send(testData[0]);
  const commentId = createRes.body._id;
  const updatedData = {
    description: "Updated comment description",
  };
  const res = await request(app).put(`/comment/${commentId}`).send(updatedData);
  expect(res.statusCode).toEqual(200);
  expect(res.body.description).toBe(updatedData.description);
});

test("should delete a comment by ID", async () => {
  const createRes = await request(app).post("/comment").send(testData[0]);
  const commentId = createRes.body._id;
  const res = await request(app).delete(`/comment/${commentId}`);
  expect(res.statusCode).toEqual(200);
  const getRes = await request(app).get(`/comment/${commentId}`);
  expect(getRes.statusCode).toEqual(404);
});
