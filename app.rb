require 'sinatra'
require "sinatra/reloader"
require 'json'
require 'pp'

register Sinatra::Reloader

get '/' do
  erb :index
end

get '/tables.json' do
#   status 404
#  error 202, "ugh"
  content_type :json
  {tables: [
   {id: 1},
   {id: 2},
   {id: 3},
   {id: 4},
   {id: 5},
   {id: 6}
 ]
   }.to_json
end

get '/tables/:id' do
  content_type :json
  case params[:id]
  when "1" then {id: 1}.to_json
  else
    idd = params[:id].to_i
    {id: idd,
     name: "fred",
     imageUrl: "/img",
     cents: idd*10}.to_json
  end
end

get '/food.json' do
  content_type :json
  {food: [
    {id: 1},
    {id: 2}
  ]}
end

