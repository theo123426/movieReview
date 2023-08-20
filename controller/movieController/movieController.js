let axios = require("../../helpers/axios")
let moment = require("moment")

let getMostPopularMovie = async (req,res,next) =>{
      let data = [];
      let end = moment().format("l").split("/")[2]
    try {
        
        let response = await axios.get('/titles',{
            params:{
                endYear:`${end}`,
                info:"base_info"
            }
        });
        let listPopular = response.data.results
        for(let i = 0; i<listPopular.length ; i++){
            let result = {
                id:listPopular[i].id,
                image: {
                    url:listPopular[i].primaryImage ? listPopular[i].primaryImage.url : "",
                    width:listPopular[i].primaryImage ? listPopular[i].primaryImage.width : "",
                    height:listPopular[i].primaryImage ? listPopular[i].primaryImage.height : "",
                    caption:listPopular[i].primaryImage ? listPopular[i].primaryImage.caption.plainText : "",
                },
                isSeries:listPopular[i].titleType.isSeries,
                isEpisode:listPopular[i].titleType.isEpisode,
                title:listPopular[i].originalTitleText.text,
                releaseYear:listPopular[i].releaseYear.year,
                rating:{
                    ratingAverage:listPopular[i].ratingsSummary.aggregateRating,
                    totalVote:listPopular[i].ratingsSummary.voteCount
                }
            }
            data.push(result)
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

let getRatingMovieById = async (req,res,next) =>{
    let id = req.params.id.slice(1,req.params.id.length)

    try {
        let getRating = await axios.get(`/titles/${id}`,{
            params:{
                info:"base_info"
            }
        })
        if(getRating){
            let results = {
                id:getRating.data.results.id,
                title:getRating.data.results.titleText ? getRating.data.results.titleText.text : "",
                rating:{
                    ratingAverage:getRating.data.results.ratingsSummary ? getRating.data.results.ratingsSummary.aggregateRating : "",
                    totalVote:getRating.data.results.ratingsSummary ? getRating.data.results.ratingsSummary.voteCount : ""
                },
                image:{
                    url:getRating.data.results.primaryImage ? getRating.data.results.primaryImage.url : "",
                    width:getRating.data.results.primaryImage ? getRating.data.results.primaryImage.width : "",
                    heigth:getRating.data.results.primaryImage ? getRating.data.results.primaryImage.heigth : "",
                    caption:getRating.data.results.primaryImage ? getRating.data.results.primaryImage.caption.plainText : ""
                },
                isSeries:getRating.data.results.isSeries,
                isEpisode:getRating.data.results.isEpisode,
                genre:getRating.data.results.genres ? getRating.data.results.genres.genres : "[]",
                releaseDate: getRating.data.results.releaseDate ? `${getRating.data.results.releaseDate.day} ${getRating.data.results.releaseDate.month} ${getRating.data.results.releaseDate.year}` : "",
                watchTime:getRating.data.results.runTime ? getRating.data.results.runTime.displayProperty.value.plainText : "",
                rank:{
                    currentRank:getRating.data.results.meterRanking ? getRating.data.results.meterRanking.currentRank : "",
                    rankChange:{
                        changeDirection:getRating.data.results.meterRanking ? getRating.data.results.meterRanking.rankChange.changeDirection : "",
                        differenceRank:getRating.data.results.meterRanking ? getRating.data.results.meterRanking.rankChange.difference : ""
                    }
                },
                plot:getRating.data.results.plot ? getRating.data.results.plot.plotText.plainText : ""

            }
            return res.status(200).json(results)
        } else {
            return res.status(400).json({message:"Wrong ID"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

let getListMovieGenre = async (req,res,next) =>{
    try {
        let getListGenre = await axios.get("/titles/utils/genres")
        if(getListGenre.data.results.length>0){
            return res.status(200).json(getListGenre.data.results)
        } else {
            return res.status(404).json({message:"page Not Found"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
module.exports = {getMostPopularMovie,getRatingMovieById,getListMovieGenre}