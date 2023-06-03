
export interface LoginResponse {
  access: string;
  refresh: string;
  user_email: string;
}

export interface BlogList {

  user_id: number;
  blog_title: string;
  blog_summary: string,
  blog_content: string,
  blog_header_image: string

}
