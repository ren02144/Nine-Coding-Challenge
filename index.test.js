import supertest from "supertest";
import { app } from "./index";

describe("Test coding challenge", () => {
  it("should return an array of response", async () => {
    expect.assertions(2);
    const mockBody = {
      payload: [
        {
          country: "UK",
          description:
            "What's life like when you have enough children to field your own football team?",
          drm: true,
          episodeCount: 3,
          genre: "Reality",
          image: {
            showImage:
              "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
          },
          language: "English",
          nextEpisode: null,
          primaryColour: "#ff7800",
          seasons: [
            {
              slug: "show/16kidsandcounting/season/1",
            },
          ],
          slug: "show/16kidsandcounting",
          title: "16 Kids and Counting",
          tvChannel: "GEM",
        },
      ],
    };

    const expected = {
      response: [
        {
          image:
            "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
          slug: "show/16kidsandcounting",
          title: "16 Kids and Counting",
        },
      ],
    };

    const actual = await supertest(app).post("/test").send(mockBody);

    expect(actual.statusCode).toEqual(200);
    expect(actual.body).toMatchObject(expected);
  });

  it("should return error when send invalid json", async () => {
    expect.assertions(2);

    const expected = {
      error: "Could not decode request: JSON parsing failed",
    };

    const actual = await supertest(app)
      .post("/test")
      .send("invalid json")
      .type("json");

    expect(actual.statusCode).toEqual(400);
    expect(actual.body).toMatchObject(expected);
  });

  it("should not return the item with drm false or episodeCount<1", async () => {
    expect.assertions(2);
    const mockBody = {
      payload: [
        {
          country: "UK",
          description:
            "What's life like when you have enough children to field your own football team?",
          drm: false,
          episodeCount: 3,
          genre: "Reality",
          image: {
            showImage:
              "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
          },
          language: "English",
          nextEpisode: null,
          primaryColour: "#ff7800",
          seasons: [
            {
              slug: "show/16kidsandcounting/season/1",
            },
          ],
          slug: "show/16kidsandcounting",
          title: "16 Kids and Counting",
          tvChannel: "GEM",
        },
        {
          country: "UK",
          description:
            "What's life like when you have enough children to field your own football team?",
          drm: true,
          episodeCount: 0,
          genre: "Reality",
          image: {
            showImage:
              "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
          },
          language: "English",
          nextEpisode: null,
          primaryColour: "#ff7800",
          seasons: [
            {
              slug: "show/16kidsandcounting/season/1",
            },
          ],
          slug: "show/16kidsandcounting",
          title: "16 Kids and Counting",
          tvChannel: "GEM",
        },
      ],
    };

    const expected = {
      response: [],
    };

    const actual = await supertest(app).post("/test").send(mockBody);

    expect(actual.statusCode).toEqual(200);
    expect(actual.body).toMatchObject(expected);
  });
});
