class ProfilesController < ApplicationController
  def new
    # Render blank profile details form
    @profile = Profile.new
  end
end