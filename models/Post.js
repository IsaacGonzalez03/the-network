export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.likes = data.likes
    this.creatorId = data.creatorId
    this.profilePic = data.creator.picture
  }
}
