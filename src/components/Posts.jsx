function Posts({ userData }) {
  return (
    <main className="mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap -mx-2 pb-12 md:@supports (display: grid) { grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 }">
          {userData.posts.map((post, index) => {

            return (
              <div
                key={index}
                className="relative m-2 md:m-0 flex-1 min-w-[200px] max-w-[300px] md:max-w-none"
                tabIndex="0"
              >
                <img
                  src={post.media_url}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
                  <ul className="flex space-x-4 text-white text-lg font-semibold">
                    <li>
                      <i className="fas fa-heart"></i> {post.likes || 0}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Posts;
