import React from "react";
import renderer from "react-test-renderer";

import AppCard from "../components/AppCard";

describe("AppCard component", () => {
  test("renders correctly", () => {
    const item = {
      category: "category1",
      title: "title1",
      subtitle: "subtitle1",
      image: "https://reactnative.dev/docs/assets/p_cat2.png"
    };

    const json = renderer
      .create(
        <AppCard
          title={item.title}
          subtitle={item.subtitle}
          image={item.image}
          category={item.category}
        />
      )
      .toJSON();
    expect(json).toMatchSnapshot();
  });

  test("contains image", () => {
    const item = {
      category: "category2",
      title: "title2",
      subtitle: "subtitle2",
      image: "https://reactnative.dev/docs/assets/p_cat2.png"
    };

    const json = renderer
      .create(
        <AppCard
          title={item.title}
          subtitle={item.subtitle}
          image={item.image}
          category={item.category}
        />
      )
      .toJSON();

    expect(json.children.includes("p_cat2.png"));
  });

  test("contains title, subtitle, and category", () => {
    const item = {
      category: "category3",
      title: "title3",
      subtitle: "subtitle3",
      image: "https://reactnative.dev/docs/assets/p_cat2.png"
    };

    const json = renderer
      .create(
        <AppCard
          title={item.title}
          subtitle={item.subtitle}
          category={item.category}
        />
      )
      .toJSON();

    expect(json.children.includes("title3"));
    expect(json.children.includes("subtitle3"));
    expect(json.children.includes("category3"));
  });
});
