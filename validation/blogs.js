const validateBlogData = (blogData) => {

	if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 40) {
		return {
			isValid: false,
			message: "Title is required and it must be a string less than 40 characters"
		}
	}
    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		return {
			isValid: false,
			message: "Text is required and it must be a string"
		}
	}
    if (blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length > 40) {
		return {
			isValid: false,
			message: "Author is required and it must be a string less than 40 characters"
		}
	}
    return {
        isValid:true
    }
}

module.exports = {
	// These two lines are equivalent because the variable name and the key for the object are the same name. Typically, we write the short-hand version.
	// validateUserData: validateUserData
	validateBlogData,
}