export type paragraphs = {
  first_sentence: string;
  main_text: string;
};

export type AboutData = {
  title: string;
  paragraphs: paragraphs[];
  action_button: {
    text: string;
    link: string;
  };
};
